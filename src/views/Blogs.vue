<template>
	<div class="blog-card-wrap">
		<div class="blog-cards container">
			<div class="toggle-edit">
				<span>Toggle Editing Post</span>
				<input type="checkbox" v-model="editPost" />
			</div>
			<BlogCard v-for="(post, i) in blogPosts" :key="i" :post="post" />
		</div>
	</div>
</template>

<script>
import BlogCard from "../components/BlogCard";

export default {
	components: {
		BlogCard
	},
	computed: {
		blogPosts() {
			return this.$store.state.blogPosts;
		},
		editPost: {
			get() {
				return this.$store.state.editPost;
			},
			set(payload) {
				this.$store.commit("toggleEditPost", payload);
			}
		}
	},
	beforeDestroy() {
		this.$store.commit("toggleEditPost", false);
	}
};
</script>

<style lang="scss" scoped>
.blog-cards {
	position: relative;
	.toggle-edit {
		display: flex;
		align-items: center;
		position: absolute;
		top: -70px;
		right: 0;
	}
	span {
		margin-right: 16px;
	}
	input[type="checkbox"] {
		position: relative;
		border: none;
		--webkit-appearance: none;
		appearance: none;
		background-color: #fff;
		outline: none;
		width: 80px;
		height: 30px;
		border-radius: 20px;
		cursor: pointer;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	input[type="checkbox"]::before {
		content: "";
		position: absolute;
		background-color: #303030;
		width: 30px;
		height: 30px;
		border-radius: 20px;
		top: 0;
		left: 0;
		transform: scale(1.1);
		transition: all ease 0.7s;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	input:checked[type="checkbox"]:before {
		background-color: #fff;
		left: 52px;
	}
}
</style>