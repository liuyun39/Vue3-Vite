<template>
  <div class="navbar-content">
    <div class="navbar-left">
      <Logo />
    </div>
    <div class="navbar-right">
      <Avatar />
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";
import Logo from "./Logo.vue";
import Avatar from "./Avatar.vue";
export default defineComponent({
	name: "NavBar",
	components:{
		Logo,
		Avatar
	},
	setup (props) {

		return {

		};
	}
});
</script>

<style lang="scss" scoped>
.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  color: #fff;
}
</style>
