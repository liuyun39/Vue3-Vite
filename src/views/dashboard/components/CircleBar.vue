<template>
  <div>
    <div
      v-if="onAnimation"
      class="recode-circle"
    >
      <div class="recode-circle--center" />
      <div class="recode-circle--border1 border" />
      <div class="recode-circle--border2 border" />
      <div class="recode-circle--border3 border" />
    </div>
    <div
      v-else
      class="status"
    >
      <div class="status-in" />
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";

export default defineComponent({
	props: {
		onAnimation: {
			type: Boolean,
			required: true
		}
	}
});
</script>

<style lang="scss" scoped>
$red-color: #ff3f3f;
@mixin position-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.recode-circle {
  position: relative;
  width: 30px;
  height: 30px;
  // border: 1px solid #ccc;
  &--center {
    @include position-center;
    width: 4px;
    height: 4px;
    background-color: $red-color;
  }
  .border {
    @include position-center;
    width: 4px;
    height: 4px;
    border: 1px solid $red-color;
    box-shadow: 0px 0px 9px $red-color;
    animation: scaleCircle 1.4s linear infinite;
  }
  &--border2 + .border {
    animation-delay: .6s;
  }
  &--border3 + .border{
    animation-delay: .12s;
  }
}

.status {
  position: relative;
  border: 1px solid $red-color;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  .status-in {
    @include position-center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: $red-color;
  }
}

@keyframes scaleCircle {
  70% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 30px;
    height: 30px;
    opacity: 0;
  }
}
</style>
