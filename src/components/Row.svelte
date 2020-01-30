<script>
  export let gutter = 0
  export let style = ''
  export let classes = ''
  export let defaultMode = 'flex'
</script>

<div class={`${defaultMode} ${classes}`} {style}>
  <slot {gutter} />
</div>
