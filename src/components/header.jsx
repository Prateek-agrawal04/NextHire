import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import { Button } from './ui/button';
import { Show, SignIn, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react';
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react';

const Header = () => {
    const [showSignIn, setshowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const { user } = useUser();

    useEffect(() => {
        if (search.get('sign-in')) {
            setshowSignIn(true);
        }
    }, [search]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setshowSignIn(false);
            setSearch({});
        }
    }
    return (
        <>
            <nav className='py-4 flex items-center mx-4 sm:mx-6 md:mx-10 lg:mx-16'>
                <Link>
                    <img src="logo.png" alt="NextHire" className='h-10 sm:h-15 md:h-17 lg:h-20' />
                </Link>
                <div className="flex ml-auto items-center gap-4">
                    <Show when="signed-out">
                        <Button variant='outline' onClick={() => { setshowSignIn(true) }}>Sign In</Button>
                        <Button variant='outline' >Sign Up</Button>
                    </Show>
                    <Show when="signed-in">
                        {user?.unsafeMetadata?.role === 'recruiter' && <Link to='/post-job'>
                            <Button variant='red' className='rounded-full'> <PenBox size={20} className='mr-2' />Post a Job</Button>
                        </Link>}
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'md:!w-[50px] md:!h-[50px]',
                                },
                            }}>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Jobs'
                                    labelIcon={<BriefcaseBusiness size={15} />}
                                    href='/my-jobs' />
                                <UserButton.Link
                                    label='Saved Jobs'
                                    labelIcon={<Heart size={15} />}
                                    href='/saved-jobs' />
                            </UserButton.MenuItems>

                        </UserButton>
                    </Show>
                </div>
            </nav>
            {showSignIn && <div className="fixed flex inset-0 items-center justify-center bg-black/50 z-50" onClick={handleOverlayClick}>
                <SignIn
                    signUpForceRedirectUrl='/onboarding'
                    fallbackRedirectUrl='/onboarding'
                />
            </div>}
        </>
    )
}

export default Header
