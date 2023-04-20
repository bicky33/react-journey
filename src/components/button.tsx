
type ButtonProps = {
    count : number,
    onClick(): void,
}

function Button({ count, onClick }: ButtonProps) {
    return  ( <button onClick={onClick}>
    count is {count}
  </button> );
}

export default Button;