function Button({text, type}) {
  return (
    <button type={type} className='text-white bg-primary rounded shadow-sm shadow-slate-300 text-base px-7 py-3'>{text}</button>
  )
}

export default Button