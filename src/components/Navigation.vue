<template>
	<header>
		<nav class="container">
			<div class="branding">
				<router-link class="header" :to="{ name: 'Home' }"
					>FireBlogs</router-link
				>
			</div>
			<div class="nav-links">
				<ul v-show="!mobile">
					<router-link class="link" :to="{ name: 'Home' }">Home</router-link>
					<router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
					<router-link class="link" :to="{ name: 'CreatePost' }"
						>Create Post</router-link
					>
					<router-link v-if="!user" class="link" :to="{ name: 'Login' }"
						>Login/Register</router-link
					>
				</ul>
				<div
					v-if="user"
					@click.stop="toggleProfileMenu"
					class="profile"
					ref="profile"
				>
					<span>{{ this.$store.state.profileInitials }}</span>
					<div v-show="profileMenu" class="profile-menu">
						<div class="info">
							<p class="initials">{{ this.$store.state.profileInitials }}</p>
							<div class="right">
								<p>
									{{ this.$store.state.profileFirstName }}
									{{ this.$store.state.profileLastName }}
								</p>
								<p>{{ this.$store.state.profileUserName }}</p>
								<p>{{ this.$store.state.profileEmail }}</p>
							</div>
						</div>
						<div class="options">
							<div class="option option--mod" @click="closeProfile">
								<router-link class="option" :to="{ name: 'Profile' }">
									<UserIcon class="icon" />
									<p>Profile</p>
								</router-link>
							</div>
							<div class="option option--mod" @click="closeProfile">
								<router-link class="option" :to="{ name: 'Admin' }">
									<AdminIcon class="icon" />
									<p>Admin</p>
								</router-link>
							</div>
							<div @click="signOut" class="option option--mod">
								<SignOutIcon class="icon" />
								<p>Sign Out</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<MenuIcon class="menu-icon" @click.stop="toggleMobileNav" v-show="mobile" />
		<transition name="mobile-nav">
			<ul class="mobile-nav" v-show="mobileNav" @click="closeMobileNav">
				<router-link class="link" :to="{ name: 'Home' }">Home</router-link>
				<router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
				<router-link class="link" :to="{ name: 'CreatePost' }"
					>Create Post</router-link
				>
				<router-link v-if="!user" class="link" :to="{ name: 'Login' }"
					>Login/Register</router-link
				>
			</ul>
		</transition>
	</header>
</template>

<script>
import MenuIcon from "@/assets/icons/bars-regular.svg";
import UserIcon from "@/assets/icons/user-alt-light.svg";
import AdminIcon from "@/assets/icons/user-crown-light.svg";
import SignOutIcon from "@/assets/icons/sign-out-alt-regular.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
	name: "navigation",
	components: {
		MenuIcon,
		UserIcon,
		AdminIcon,
		SignOutIcon
	},
	props: ["clickWindow"],
	data() {
		return {
			profileMenu: false,
			mobile: null,
			mobileNav: null,
			windowWidth: null
		};
	},
	created() {
		window.addEventListener("resize", this.checkScreen);
		this.checkScreen();
	},
	methods: {
		checkScreen() {
			this.windowWidth = window.innerWidth;
			if (this.windowWidth < 750) {
				this.mobile = true;
				return;
			}
			this.mobile = false;
			this.mobileNav = false;
			return;
		},
		toggleMobileNav() {
			this.mobileNav = !this.mobileNav;
		},
		toggleProfileMenu(e) {
			if (e.target === this.$refs.profile) {
				this.profileMenu = !this.profileMenu;
			}
		},
		signOut() {
			firebase.auth().signOut();
			window.location.reload();
		},
		closeProfile() {
			this.profileMenu = false;
		},
		closeMobileNav(e) {
			if (e.target.className.includes("link")) {
				this.mobileNav = false;
			}
		}
	},
	computed: {
		user() {
			return this.$store.state.user;
		}
	},
	watch: {
		clickWindow() {
			this.profileMenu = false;
			this.mobileNav = false;
		}
	}
};
</script>

<style lang="scss" scoped>
header {
	background-color: #fff;
	padding: 0 25px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px --1px rgba(0, 0, 0, 0.06);
	z-index: 99;
	.link {
		font-weight: 500;
		padding: 0 8px;
		transition: 0.3s color ease;
		&:hover {
			color: #1eb8b8;
		}
	}
	nav {
		display: flex;
		padding: 25px 0;
		.branding {
			display: flex;
			align-items: center;
			.header {
				font-weight: 600;
				font-size: 24px;
				color: #000;
				text-decoration: none;
			}
		}
		.nav-links {
			position: relative;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: flex-end;
			ul {
				margin-right: 32px;
				.link {
					margin-right: 32px;
				}
				.link:last-child {
					margin-right: 0;
				}
			}
			.profile {
				position: relative;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				color: #fff;
				background-color: #303030;
				transition: all 0.5s ease;
				&:hover {
					background-color: #666;
				}
				span {
					pointer-events: none;
				}
				.profile-menu {
					position: absolute;
					top: 65px;
					right: 0;
					width: 250px;
					background-color: #303030;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
						0 2px 4px -1px rgba(0, 0, 0, 0.06);
					.info {
						display: flex;
						align-items: center;
						padding: 15px;
						border-bottom: 1px solid #fff;
						.initials {
							position: initial;
							width: 40px;
							height: 40px;
							background-color: #fff;
							color: #303030;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 50%;
						}
						.right {
							flex: 1;
							margin-left: 24px;
							p:nth-child(1) {
								font-size: 14px;
							}
							p:nth-child(2),
							p:nth-child(3) {
								font-size: 12px;
							}
						}
					}
					.options {
						.option {
							text-decoration: none;
							color: #fff;
							display: flex;
							align-items: center;
							height: 40px;
							width: 100%;
							transition: all 0.5s ease;
							&:hover {
								background-color: #666;
							}
							.icon {
								width: 18px;
								height: auto;
							}
							p {
								font-size: 14px;
								margin-left: 12px;
							}
							&:last-child {
								margin-bottom: 0;
							}
						}
					}
					.option--mod {
						padding: 0 10px;
					}
				}
			}
		}
	}
	.menu-icon {
		cursor: pointer;
		position: absolute;
		top: 32px;
		right: 80px;
		height: 25px;
		width: auto;
		@media (min-width: 800px) {
			right: 25px;
		}
	}
	.mobile-nav {
		padding: 20px;
		width: 70%;
		max-width: 250px;
		display: flex;
		flex-direction: column;
		position: fixed;
		height: 100%;
		background-color: #303030;
		top: 0;
		left: 0;
		.link {
			padding: 15px 0;
			color: #fff;
		}
	}
	.mobile-nav-enter-active,
	.mobile-nav-leave-active {
		transition: all 1s ease;
	}
	.mobile-nav-enter {
		transform: translateX(-100%);
	}
	.mobile-nav-enter-to {
		transform: translateX(0%);
	}
	.mobile-nav-leave-to {
		transform: translateX(-100%);
	}
}
</style>
