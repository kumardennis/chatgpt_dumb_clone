import { UserDataModel } from "models/user.models";
import { useRef, useState, KeyboardEvent } from "react";

type PropTypes = {
  user: UserDataModel;
  onSubmit: (message: string) => Promise<void>;
};

export const ChatRoomInput = ({ user, onSubmit }: PropTypes) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, toggleLoading] = useState<boolean>(false);

  const submitForm = async () => {
    if (!inputRef.current?.value) {
      return null;
    }

    toggleLoading(true);

    await onSubmit(inputRef.current.value);

    clearInput();
    toggleLoading(false);
  };

  const clearInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") await submitForm();
  };

  return (
    <div className='chat-room-input-container'>
      <input
        disabled={isLoading}
        autoFocus
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder='Message DumbGPT...'
        className='chat-room-input'
      />
      <button disabled={isLoading} onClick={submitForm}>
        Send
      </button>
    </div>
  );
};
