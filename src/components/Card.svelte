<script>
  export let type = 'material'
  export let border = undefined
  export let bg = undefined
  export let classes = undefined
  export let id = ''
  export let style = ''

  let myClasses = ''

  switch (type) {
    case 'flat':
      myClasses = `p-2 rounded ${border ? `border-${border}` : 'border'} ${
        bg ? `bg-${bg}` : 'bg-white'
      } ${classes ? classes : ''}`
      break
    case 'material':
    default:
      myClasses = `p-2 rounded ${border ? `border-${border}` : ''} shadow-md ${
        bg ? `bg-${bg}` : 'bg-white'
      } ${classes ? classes : ''}`
  }
</script>

<div class={myClasses} {id} {style}>
  <slot />
</div>
