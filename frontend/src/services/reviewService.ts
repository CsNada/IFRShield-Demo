import API_BASE_URL from "./api";

export async function uploadReview(

  file: File,

  company: string,

  reviewType: string,

  accountingTopic: string

) {

  const formData = new FormData();

  formData.append("file", file);

  formData.append("company", company);

  formData.append("review_type", reviewType);

  formData.append("accounting_topic", accountingTopic);

  const response = await fetch(`${API_BASE_URL}/review`, {

    method: "POST",

    body: formData,

  });

  if (!response.ok) {

    throw new Error("Upload failed");

  }

  return await response.json();

}