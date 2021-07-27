export default function useScrollToTop(): () => void {
  function handleScrollToTop(): void {
    if(!window?.scrollTo) {
      return;
    }

    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    
    if (currentScroll > 0) {
      window.requestAnimationFrame(handleScrollToTop);
      window.scrollTo (0, currentScroll - (currentScroll / 5));
    }
  }

  return handleScrollToTop;
}
