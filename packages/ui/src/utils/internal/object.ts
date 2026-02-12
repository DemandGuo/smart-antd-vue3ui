export function useDebounce<F extends (...args: any[]) => any>(fn: F, ms = 300) {
    let t: any;
    return (...args: Parameters<F>) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    };
}
