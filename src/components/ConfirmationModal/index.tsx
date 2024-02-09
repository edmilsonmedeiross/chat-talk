import { useRouter } from "next/navigation";

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
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Senha:</label>
          <input id="password" name="password" type="password" />
          <button type="submit">Entrar</button>
        </form>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  ) : null;
}

export default ConfirmationModal;
