import copyImg from '../../assets/images/copy.svg';

import './styles.scss';

type Props = {
  code: string;
};

export function RoomCode({ code }: Props) {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button
      title="Copiar código da sala"
      className="room-code"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>Sala {code}</span>
    </button>
  );
}
