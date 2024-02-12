import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ConfirmationModal({ isOpen, onClose, room }) {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    console.log(password);

    onClose();

    router.push(`/${room.id}`);
  };

  return isOpen ? (
    <Card>
      <CardContent>
        <CardDescription>
          Essa sala é privada, por favor, insira a senha para acessar.
        </CardDescription>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Senha:</label>
          <input id="password" name="password" type="password" />
          <button type="submit">Entrar</button>
        </form>
      </CardContent>
      <CardFooter>
        <button onClick={onClose}>Fechar</button>
      </CardFooter>
    </Card>
  ) : null;
}

export default ConfirmationModal;
