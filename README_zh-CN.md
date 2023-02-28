<div align="center">
<article style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <p align="center"><img width="300" src="https://user-images.githubusercontent.com/25022954/209616423-9ab056be-5d62-4eeb-b91d-3b20f64cfcf8.svg" /></p>
    <h1 style="width: 100%; text-align: center;"></h1>
    <p align="center">
        简体中文 | <a href="./README.md" >English</a>
    </p>
</article>
    
   
</div>

# 配置指引

## 配置后端环境

### 配置最新后端服务器

为了找到正确的安装版本，请在 [Test Pypi](https://test.pypi.org/) 搜索labelU。

```bash
# change version '0.1.220' to the version you need.
pip install -i https://test.pypi.org/simple/ labelu==0.1.220
labelu --help
labelu --port 8000
```

### 配置前端环境

```bash
npm install

# edit proxy configuration in need.
vim vite.config.js

npm run start

open http://localhost:3000/
```
