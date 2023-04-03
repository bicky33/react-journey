
type ButtonProps = {
    count : number,
    handleClick(): void,
}

function Button({ count, handleClick }: ButtonProps) {
    return  ( <button onClick={handleClick}>
    count is {count}
  </button> );
}

export default Button;