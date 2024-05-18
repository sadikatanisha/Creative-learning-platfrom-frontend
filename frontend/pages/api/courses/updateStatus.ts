import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface UpdateStatusRequestBody {
  courseId: string;
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { courseId, status } = req.body as UpdateStatusRequestBody;

  try {
    const response = await axios.put(
      `https://creative-learning-platfrom-2.onrender.com/api/v1/courses/${courseId}/status`,
      { status },
      { withCredentials: true }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
}
