# 🚀 GitHub Repository Setup Commands

## 📋 Step 1: Create Repository di GitHub
1. Buka [GitHub.com](https://github.com) dan login
2. Click **"New repository"** 
3. **Repository name**: `ai-video-quiz-generator`
4. **Description**: `AI-powered video quiz generator built with React, TypeScript, and Vite`
5. **Visibility**: Public atau Private (ikut awak)
6. **JANGAN tick** README, .gitignore, license (kita dah ada)
7. Click **"Create repository"**

## 🔗 Step 2: Copy Repository URL
Selepas create, copy URL dari GitHub (akan jadi macam ni):
- **HTTPS**: `https://github.com/USERNAME/ai-video-quiz-generator.git`
- **SSH**: `git@github.com:USERNAME/ai-video-quiz-generator.git`

## ⚡ Step 3: Run Commands di Terminal

### Guna HTTPS (Recommended untuk beginners):
```bash
git remote add origin https://github.com/USERNAME/ai-video-quiz-generator.git
git push -u origin master
```

### Guna SSH (kalau dah setup SSH keys):
```bash
git remote add origin git@github.com:USERNAME/ai-video-quiz-generator.git
git push -u origin master
```

## 🔍 Step 4: Verify Setup
```bash
git remote -v
git status
```

## 📝 Notes:
- Ganti `USERNAME` dengan username GitHub awak
- Kalau ada error, pastikan repository dah create di GitHub
- Kalau guna SSH, pastikan SSH keys dah setup

## 🆘 Troubleshooting:
- **Error "remote already exists"**: Run `git remote remove origin` dulu
- **Error "fatal: refusing to merge unrelated histories"**: Run `git pull origin master --allow-unrelated-histories`

---

**Happy Coding! 🎯✨**
