<template>
  <div class="navbar-content">
    <div class="navbar-left">
      <Logo />
      <Breadcrumb />
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
import Breadcrumb from "./Breadcrumb.vue";
export default defineComponent({
	name: "NavBar",
	components:{
		Logo,
		Avatar,
		Breadcrumb
	},
	setup () {

		return {
		};
	}
});
</script>

<style lang="scss" scoped>
@mixin _flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-content {
  @include _flex();
  height: 100%;
  padding: 0 10px;
  color: #fff;

  .navbar-left {
    @include _flex();
  }
}
</style>
