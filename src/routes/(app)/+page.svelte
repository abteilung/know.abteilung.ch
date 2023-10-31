<script lang="ts">
	import ZoomingText from '$lib/components/ZoomingText.svelte';
	import Glitch from '$lib/components/Glitch.svelte';
</script>

<div class="h-[80vh] bg-black text-white px-12 py-8 rounded-3xl mb-12">
	<ZoomingText class="text-2xl" id="quote">
		SplitText now supports <strong>nested tags</strong> like
		<span class="code">&lt;span&gt;</span>,
		<span class="code">&lt;strong&gt;</span>, and <span class="code">&lt;em&gt;</span>. Want to
		preserve a link? <a href="https://www.greensock.com" target="_blank">No problem</a>. You can
		even
		<em>GO NUTS with EMOJI</em>
		🐳 🍔 ❤️ And also wrap <a href="#">words</a> within links.
	</ZoomingText>

	<Glitch text="Ich bin ein glitchiger Text" />
</div>

<div class="text-xl space-y-12">
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, aliquid nulla. Perspiciatis
		qui consectetur eligendi, aliquid earum amet. Atque porro tempore alias earum sapiente
		doloremque tenetur fugiat, sunt assumenda sint.
	</p>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem harum error et consequatur eius
		maiores nisi officia unde odit corrupti modi incidunt quod necessitatibus perspiciatis, repellat
		voluptas ab quasi voluptate.
	</p>
</div>

<style lang="postcss">
	.code {
		font-family: Courier;
		color: rgb(221, 202, 126);
	}

	a:visited,
	a:link,
	a:active {
		color: #87cd02;
		text-decoration: none;
		display: inline-block;
	}

	a:hover {
		background-color: #87cd02;
		color: white;
	}

	span {
		display: inline-block;
	}
</style>
