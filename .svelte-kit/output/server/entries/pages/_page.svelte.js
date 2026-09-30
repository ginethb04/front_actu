import "../../chunks/internal.js";
import "../../chunks/server.js";
import "../../chunks/client.js";
import "../../chunks/navigation.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div></div>`);
	});
}
//#endregion
export { _page as default };
