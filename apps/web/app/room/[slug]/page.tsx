import axios from "axios";
import { BACKEND_URL } from "../../config";

interface Chatprops {
  params: {
    slug: string;
  };
}

async function getRoomId(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data.id;
}

export default async function SlugRoom({ params }: Chatprops) {
  const slug = params.slug;
  const roomId = await getRoomId(slug);
}
