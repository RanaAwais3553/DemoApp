class Debouncer<T extends Function> {
  h: NodeJS.Timeout | undefined = undefined;
  waitMilliseconds: number;

  constructor(waitMilliseconds: number) {
    this.waitMilliseconds = waitMilliseconds;
  }

  debounce(callback: () => void) {
    this.h && clearTimeout(this.h);
    this.h = setTimeout(callback, this.waitMilliseconds);
  }

  cleanup() {
    this.h && clearTimeout(this.h);
  }
}

export default Debouncer;
