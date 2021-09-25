<template>
	<div class="home">
		<BlogPost v-if="!user" :post="welcomeScreen" />
		<BlogPost v-for="(post, i) in blogPostsFeed" :key="i" :post="post" />
		<div class="blog-card-wrap">
			<div class="container">
				<h3 class="title">View More Recent Blogs</h3>
				<div class="blog-cards">
					<BlogCard v-for="(post, i) in blogPostsCards" :key="i" :post="post" />
				</div>
			</div>
		</div>
		<div v-if="!user" class="updates">
			<div class="container">
				<h2 class="updates-title">
					Never miss a post. Register for your free account today
				</h2>
				<router-link class="router-button" :to="{ name: 'Login' }">
					Register for FireBlogs <Arrow class="arrow arrow-light" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import BlogCard from "../components/BlogCard";
import BlogPost from "@/components/BlogPost";
import Arrow from "@/assets/icons/arrow-right-light.svg";
export default {
	name: "Home",
	components: {
		BlogCard,
		BlogPost,
		Arrow
	},
	data() {
		return {
			welcomeScreen: {
				title: "Welcome",
				blogPost:
					"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis dolores magni eius porro est? Vel enim voluptatum distinctio quas doloremque cumque voluptates, nam minima error eaque id consequuntur eveniet nostrum.",
				welcomeScreen: true,
				photo: "coding"
			}
		};
	},
	computed: {
		blogPostsCards() {
			return this.$store.getters.blogPostsCards;
		},
		blogPostsFeed() {
			return this.$store.getters.blogPostsFeed;
		},
		user() {
			return this.$store.state.user;
		}
	}
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
	.title {
		font-weight: 300;
		font-size: 28px;
		margin-bottom: 32px;
	}
}
.updates {
	.container {
		padding: 100px 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		@media (min-width: 800px) {
			padding: 125px 25px;
			flex-direction: row;
		}
		.router-button {
			display: flex;
			font-size: 14px;
			text-decoration: none;
			@media (min-width: 800px) {
				margin-left: auto;
			}
		}
		.updates-title {
			font-weight: 300;
			font-size: 32px;
			max-width: 425px;
			width: 100%;
			text-align: center;
			text-transform: uppercase;
			@media (min-width: 800px) {
				text-align: initial;
				font-size: 40px;
			}
		}
	}
}
</style>
