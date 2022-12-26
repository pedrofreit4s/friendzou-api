import axios from "axios";
import { whatsappConstants } from "../../infra/constants/whatsapp";
import FormData from "form-data";

export async function sendWhatsappMessage(phone: string, message: string) {
  try {
    const form = new FormData();

    form.append("phonenumber", `55${phone}`);
    form.append("text", message);

    const { data } = await axios.post(
      `${whatsappConstants.url}/sendMessage/${whatsappConstants.key}`,
      form
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível enviar a mensagem pro seu número!");
  }
}
