import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const filename = `resume-${random}-${jobData.candidate_id}`;

    const { error: storageError } = await supabase.storage.from("resume").upload(filename, jobData.resume);

    if (storageError) {
        console.error("Error Uploading resume:", storageError);
        return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resume/${filename}`;

    const { data, error } = await supabase.from("applications").insert([
        {
            ...jobData,
            resume,
        }
    ]).select();

    if (error) {
        console.error("Error Submitting Application:", error);
        return null;
    }
    return data;
}

export async function updateApplicationStatus(token, { id }, status) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("applications").update({ status }).eq("id", id).select();

    if (error) {
        console.error("Error Updating Application Status:", error);
        return null;
    }

    if (!data || data.length === 0) {
        console.warn("No rows updated");
        return null;
    }
    return data;

}