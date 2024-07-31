# tiny-miniprogram-components

微信小程序自定义组件

## 安装

```bash
npm install --save tiny-miniprogram-components
```

## 使用

该库暴露了以下几个常用组件:
- empty: 空状态组件
- font-icon: 阿里iconfont图标组件
- modal: 模态框
- nav-bar: 自定义导航栏
- popup: 底部弹出的弹出层

此外，该库中的utils目录下的所有方法都可按需使用:

- auth.js: 本地存储授权相关信息
- common.js: 常用公共方法
- entryStore: 用于搜索历史记录业务下的历史记录本地存取
- layout.js: 布局信息获取
- ls.js: 基础本地存储
- request.js: 网络请求封装，使用时需稍加修改即可
- router.js: 路由相关方法封装
- uuid.js: uuid生成

> 注意：使用时，由于部分组件（如nav-bar组件）使用到了`utils`中的方法，所以请务必将`components`目录和`utils`目录在同一目录下

下载该库后，将该库的components和utils目录直接放到你小程序的根目录下即可。然后直接通过微信小程序`usingComponent`引入即可。

```json

{
  "usingComponents": {
    "font-icon": "/path/to/miniprogram-native-components/font-icon"
  }
}
```

```html
    <font-icon name="icon-xxx"></font-icon>
```

## API

### empty

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 空状态说明文本 | string | '暂无数据，正努力完善中..' |
| actionButton | 是否显示按钮 | boolean | false |
| actionButtonText | 按钮文字 | string | - |
| `empty-class` | 外层容器外部样式类名 | string | - |
| `action-button-class` | 按钮外部样式类名 | string | - |
| `bind:tapactionbutton` | 点击按钮时候触发 | event | - |

### font-icon

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | icon名称 | string | - |
| size | icon大小 | string | - |
| color | icon颜色 | string | - |
| `icon-class` | icon外部样式类名 | string | - |
| `bind:tapicon` | icon点击时触发 | event | - |

### modal

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否打开模态框 | boolean | false |
| mask | 是否显示遮罩层 | boolean | true |
| maskClickable | 遮罩层是否可点击 | boolean | true |
| zIndex | 层级 | number | 1000 |
| title | 模态框标题 | string | - |
| closable | 是否在模态框右上角显示关闭按钮 | boolean | true |
| disableAnimation | 是否禁用弹出动画 | boolean | false |
| duration | 弹出动画时长 | number | 300 |
| `bind:tapclose` | 点击模态框右上角关闭按钮触发 | event | - |
| `bind:tapmask` | 点击模态框遮罩层触发 | event | - |

```html
<modal open="{{true}}" bind:tapclose="handleTapClose">
    <view style="width: 80vw;">我是一个可爱的模态框</view>
</modal>
```

### popup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否弹出popup | boolean | false |
| mask | 是否显示遮罩层 | boolean | true |
| maskClickable | 遮罩层是否可点击 | boolean | true |
| zIndex | 组件层级 | number | 1000 |
| disableAnimation | 是否禁用弹出动画 | boolean | false |
| duration | 弹出动画时长 | number | 300 |
| `bind:tapmask` | 点击遮罩层触发 | string | #ffffff |

```html
<popup open="{{true}}" bind:tapmask="handleTapClose">
    <view style="height: fit-content;">我是底部弹出层</view>
</popup>
```
### nav-bar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| iconName | 返回按钮图标名称 | string | 'icon-dingbu-fanhui' |
| iconColor | 返回按钮图标颜色 | string | '#333333' |
| iconSize | 返回按钮图标大小 | number | 40 |
| navBarOffset | navbar高度偏移量 | number | 0 |
| navigationBarBackgroundColor | 导航栏背景色 | string | "#fff" |
| navigationBarTextStyle | 导航栏前景色 | string | "#333333" |
| navigationBarTitleText | 导航栏标题 | string | - |
| backgroundColorTop | 顶部背景色 | string | "#fafafd" |
| navigationBarPlaceholder | 是否显示和导航栏等高的占位元素 | boolean | true |
| fixed | 是否固定 | boolean | true |
| disableBack | 是否禁用返回 | boolean | false |
| zIndex | 组件层级 | number | 99999999 |
| `navbar-class` | 组件外部样式类 | string | - |
| `placeholder-class` | 组件外部样式类 | string | - |
| `bind:beforeback` | 点击返回之前触发 | event | - |
| `bind:layout` | 获取导航栏布局信息 | event | - |

```html
<nav-bar navigation-bar-title-text="导航标题" bind:layout="getNavLayout">
    <view>我是返回按钮旁边的额外内容</view>
</nav-bar>
```

> 注意：组件的属性书写规则和微信小程序保持一致, 例如：`maskClickable` 属性应写成 `<popup mask-clickable="{{true}}"></popup>`。

# License

MIT
