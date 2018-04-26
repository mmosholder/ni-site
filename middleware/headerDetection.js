export default function({ route, store, isDev }) {
  let version = route.query._storyblok || isDev ? "draft" : "published";

  return store.dispatch("loadHeader", {
    version: version
  });
}
