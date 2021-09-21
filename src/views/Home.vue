<template>
	<div class="home">
		<BlogPost :post="welcomeScreen" />
		<BlogPost v-for="(post, i) in sampleBlogPost" :key="i" :post="post" />
		<div class="blog-card-wrap">
			<div class="container">
				<h3 class="title">View More Recent Blogs</h3>
				<div class="blog-cards">
					<BlogCards
						v-for="(post, i) in sampleBlogCards"
						:key="i"
						:post="post"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BlogCards from "../components/BlogCards";
import BlogPost from "@/components/BlogPost";
export default {
	name: "Home",
	components: {
		BlogCards,
		BlogPost
	},
	data() {
		return {
			welcomeScreen: {
				title: "Welcome",
				blogPost:
					"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis dolores magni eius porro est? Vel enim voluptatum distinctio quas doloremque cumque voluptates, nam minima error eaque id consequuntur eveniet nostrum.",
				welcomeScreen: true,
				photo: "coding"
			},
			sampleBlogPost: [
				{
					title: "This is a title",
					blogHTML: "This is a blog post title",
					blogCoverPhoto: "beautiful-stories"
				},
				{
					title: "This is a title",
					blogHTML: "This is a blog post title",
					blogCoverPhoto: "designed-for-everyone"
				}
			],
			sampleBlogCards: [
				{
					blogTitle: "Blog Card #1",
					blogCoverPhoto: "stock-1",
					blogDate: "May 1, 2021"
				},
				{
					blogTitle: "Blog Card #2",
					blogCoverPhoto: "stock-2",
					blogDate: "May 1, 2021"
				},
				{
					blogTitle: "Blog Card #3",
					blogCoverPhoto: "stock-3",
					blogDate: "May 1, 2021"
				},
				{
					blogTitle: "Blog Card #4",
					blogCoverPhoto: "stock-4",
					blogDate: "May 1, 2021"
				}
			]
		};
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
</style>
