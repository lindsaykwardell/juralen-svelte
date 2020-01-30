<script>
  export let gutter = 0
  export let classes = 'flex-1'
  export let style = ''
</script>

<div class={`p-${gutter} ${classes}`} {style}>
  <slot>
    <span>{gutter}</span>
  </slot>
</div>
