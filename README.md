# hydro-base64

给 Hydro 的部分请求体进行一次额外的 base64 编码，以防止被一些有怪癖（quirks）的 WAF 误认为是恶意请求导致被拦截。

## 安装方法

在 Hydro v4.11.2 下通过测试。Hydro 可能会发生变更，请以实际情况为准，自行调整部分操作和代码。

### 服务端

1. 克隆或下载本仓库。
2. 添加插件：`hydrooj addon add /path/to/hydro-base64`。
3. 重启 Hydro。

### 客户端

1. 克隆 Hydro 仓库 <https://github.com/hydro-dev/Hydro>。
2. 编辑 `@hydrooj/ui-default` 包中的 `utils/base.ts`，修改 `request.post` 函数，可以参考下面的 patch。
3. 构建该包并安装。
4. 注意清除浏览器的站点数据（缓存存储和 ServiceWorker）。

```diff
diff --git a/packages/ui-default/utils/base.ts b/packages/ui-default/utils/base.ts
index 53744dbc..c0709cdd 100644
--- a/packages/ui-default/utils/base.ts
+++ b/packages/ui-default/utils/base.ts
@@ -147,7 +147,12 @@ export const request = {
     } else {
       // {foo: 'bar'}
       postData = JSON.stringify(dataOrForm);
+      postData = JSON.stringify({ encodedBody: window.btoa(postData) });
       options.contentType = 'application/json';
+      if (!options.headers) {
+        options.headers = {};
+      }
+      options.headers['X-Hydro-Encoding'] = 'base64';
     }
     return request.ajax({
       url,
```
