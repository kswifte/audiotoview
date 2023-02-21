/**
 * @el 插入乐谱根元素
 * @url 音乐url链接
 * @color 可选参数 乐谱颜色,默认红色
 * @size 可选参数 乐谱每格宽度,默认为1
 */
interface Options {
    /**
     * 插入乐谱根元素
     */
    el: HTMLDivElement;
    /**
     * 音乐url链接
     */
    url: string;
    /**
     * color 乐谱颜色,默认红色
     */
    color?: string;
    /**
     * size 乐谱每格宽度,默认为1
     */
    size?: number;
}

declare function initToShow(options: Options): void;

export { initToShow as default };
