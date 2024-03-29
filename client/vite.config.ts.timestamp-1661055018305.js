// vite.config.ts
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-svgr";
var vite_config_default = defineConfig({
  build: {
    outDir: "build",
    outDir: "../dist"
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIGltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbi8vIGltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuLy8gaW1wb3J0IHN2Z3IgZnJvbSBcInZpdGUtcGx1Z2luLXN2Z3JcIjtcclxuLy8gaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbi8vICAgICBlbnZQcmVmaXg6ICdSRUFDVF9BUFBfJyxcclxuLy8gICAgIHBsdWdpbnM6IFtyZWFjdCgpLCBzdmdyKCksXHJcbi8vICAgICB0c2NvbmZpZ1BhdGhzKCldLFxyXG4vLyB9KVxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXJlZnJlc2gnXHJcbmltcG9ydCBzdmdyUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICAvLyBUaGlzIGNoYW5nZXMgdGhlIG91dCBwdXQgZGlyIGZyb20gZGlzdCB0byBidWlsZFxyXG4gICAgLy8gY29tbWVudCB0aGlzIG91dCBpZiB0aGF0IGlzbid0IHJlbGV2YW50IGZvciB5b3VyIHByb2plY3RcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgb3V0RGlyOiAnYnVpbGQnLFxyXG4gICAgICAgIG91dERpcjogJy4uL2Rpc3QnLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICByZWFjdFJlZnJlc2goKSxcclxuICAgICAgICBzdmdyUGx1Z2luKHtcclxuICAgICAgICAgICAgc3Znck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGljb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAuLi5zdmdyIG9wdGlvbnMgKGh0dHBzOi8vcmVhY3Qtc3Znci5jb20vZG9jcy9vcHRpb25zLylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgIF0sXHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQVVBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sZ0JBQWdCO0FBSXZCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBR3hCLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsTUFDUCxhQUFhO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFFVjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
