const Input = (props) => {

  const {
    label,
    type = 'text',
    className,
    value,
    name,
    onChange
  } = props;

  return (
    <div className="space-y-1">
      {label ? <label
         className="text-[14px]"
      >{label}</label> : null}
      <div>
        <input
          type={type}
          name={name}
          value={value}
          className={
            className ?
            className :
            'h-[54px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          }
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Input