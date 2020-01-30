<script>
  export let disabled = false
  export let color = undefined
  export let text = undefined
  export let classes = ''
  export let size = ''
  export let underline = false
  export let onClick = () => null
  export let style = ""

  let buttonSize = 'py-2 px-4'

  switch (size) {
    case 'na':
      buttonSize = ''
      break
    case 'sm':
      buttonSize = 'py-1 px-2 text-xs'
      break
    case 'md':
      buttonSize = 'py-3 px-5'
      break
    case 'lg':
      buttonSize = 'py-3 px-5 text-lg'
      break
    default:
      buttonSize = 'py-2 px-4'
  }

  $: className = `bg-${
    disabled ? 'gray-500' : color ? `${color}-500` : 'blue-500'
  } hover:bg-${disabled ? 'gray' : color ? color : 'blue'}-700 text-${
    text ? text : color === 'none' ? 'black' : 'white'
  } ${
    color !== 'none'
      ? 'shadow hover:shadow-md'
      : text
      ? `hover:text-${text}${
          text && text.indexOf('dark') > -1 ? 'er' : '-dark'
        }`
      : 'hover:text-gray-700'
  } font-light ${
    underline ? 'underline' : 'no-underline'
  } ${buttonSize} rounded ${classes ? classes : ''}`
</script>

<button {style} class={className} on:click={() => disabled ? null : onClick() }>
  <slot />
</button>
