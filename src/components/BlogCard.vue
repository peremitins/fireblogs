<template>
	<router-link
		tag="div"
		class="blog-card"
		:to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }"
	>
		<transition name="editButtonsAnim">
			<div v-show="$store.state.editPost" class="icons">
				<div @click="editPosts" class="icon">
					<Edit class="edit" />
				</div>
				<div @click="deletePost" class="icon">
					<Delete class="delete" />
				</div>
			</div>
		</transition>
		<img :src="post.blogCoverPhoto" alt="" />
		<div class="info">
			<h4 class="blog-card-title">{{ post.blogTitle }}</h4>
			<h6 class="blog-card-date">
				Posted on:
				{{
					new Date(post.blogDate).toLocaleString("en-us", { dataStyle: "long" })
				}}
			</h6>
			<router-link
				class="link"
				:to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }"
				>View The Post <Arrow class="arrow"
			/></router-link>
		</div>
	</router-link>
</template>

<script>
import Arrow from "@/assets/icons/arrow-right-light.svg";
import Edit from "@/assets/icons/edit-regular.svg";
import Delete from "@/assets/icons/trash-regular.svg";

export default {
	name: "BlogCard",
	props: ["post"],
	components: {
		Arrow,
		Edit,
		Delete
	},
	methods: {
		deletePost() {
			this.$store.dispatch("deletePost", this.post.blogID);
		},
		editPosts() {
			this.$router.push({
				name: "EditBlog",
				params: { blogid: this.post.blogID }
			});
		}
	},
	computed: {
		editPost() {
			return this.$store.state.editPost;
		}
	}
};
</script>

<style lang="scss" scoped>
.blog-card {
	position: relative;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	background-color: #fff;
	min-height: 420px;
	will-change: transform;
	backface-visibility: hidden;
	transition: all 0.5s ease;
	&:hover {
		transform: rotateZ(-1deg) scale(1.02);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	.icons {
		display: flex;
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 99;
		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 35px;
			height: 35px;
			border-radius: 50%;
			background-color: #fff;
			transition: all 0.5s ease;
			&:hover {
				background-color: #303030;
				.edit,
				.delete {
					path {
						fill: #fff;
					}
				}
			}
			&:nth-child(1) {
				margin-right: 8px;
			}
			.edit,
			.delete {
				pointer-events: none;
				height: 15px;
				width: auto;
			}
		}
	}
	img {
		display: block;
		border-radius: 8px 8px 0 0;
		z-index: 1;
		width: 100%;
		min-height: 200px;
		object-fit: cover;
	}
	.info {
		display: flex;
		flex-direction: column;
		height: 100%;
		z-index: 3;
		padding: 32px 16px;
		color: #000;
		.blog-card-title {
			padding-bottom: 8px;
			font-size: 20px;
			font-weight: 300;
		}
		.blog-card-date {
			font-weight: 400;
			font-size: 12px;
			padding-bottom: 16px;
		}
		.link {
			display: inline-flex;
			align-items: center;
			margin-top: auto;
			font-weight: 500;
			padding-top: 20px;
			font-size: 12px;
			padding-bottom: 4px;
			transition: all 0.5s ease-in;
			&:hover {
				color: rgba(48, 48, 48, 0.8);
			}
			.arrow {
				width: 10px;
			}
		}
	}
}
.editButtonsAnim-enter-active,
.editButtonsAnim-leave-active {
	transition: all 1s ease;
}
.editButtonsAnim-enter {
	opacity: 0;
}
.editButtonsAnim-enter-to {
	opacity: 1;
}
.editButtonsAnim-leave-to {
	transition: all 0.5s ease;
	opacity: 0;
}
</style>