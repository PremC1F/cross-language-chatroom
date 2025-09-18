# 🚨 Railway Deployment Troubleshooting Guide

## Common Railway Deployment Issues & Solutions

### Issue 1: Build Failed / Dependencies Error

**Symptoms:**
- Build fails during npm install
- "Module not found" errors
- Dependency resolution issues

**Solutions:**

1. **Check Node.js version:**
   ```bash
   # Add to server/package.json
   "engines": {
     "node": ">=16.0.0"
   }
   ```

2. **Clear Railway cache:**
   - Go to Railway dashboard
   - Click on your project
   - Go to "Settings" → "General"
   - Click "Clear Build Cache"
   - Redeploy

3. **Verify package.json:**
   - Make sure all dependencies are in `dependencies` (not `devDependencies`)
   - Check for any typos in package names

### Issue 2: Server Crashes on Start

**Symptoms:**
- Deployment succeeds but server crashes
- "Application failed to start" error
- Health check fails

**Solutions:**

1. **Check the logs:**
   - Go to Railway dashboard
   - Click "Deployments"
   - Click on the latest deployment
   - Check the logs for error messages

2. **Test locally first:**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Add error handling:**
   ```javascript
   // Add to server/index.js at the top
   process.on('uncaughtException', (error) => {
     console.error('Uncaught Exception:', error);
   });
   
   process.on('unhandledRejection', (reason, promise) => {
     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   });
   ```

### Issue 3: Port Issues

**Symptoms:**
- "Port already in use" error
- Server starts but not accessible

**Solutions:**

1. **Use Railway's PORT environment variable:**
   ```javascript
   const PORT = process.env.PORT || 3001;
   server.listen(PORT, '0.0.0.0', () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

2. **Check Railway environment variables:**
   - Make sure `PORT` is not manually set
   - Railway automatically sets this

### Issue 4: CORS Issues

**Symptoms:**
- Frontend can't connect to backend
- CORS errors in browser console

**Solutions:**

1. **Set FRONTEND_URL environment variable:**
   - In Railway dashboard
   - Go to "Variables"
   - Add: `FRONTEND_URL` = `https://your-frontend.vercel.app`

2. **Update CORS configuration:**
   ```javascript
   const io = socketIo(server, {
     cors: {
       origin: process.env.FRONTEND_URL || "*",
       methods: ["GET", "POST"]
     }
   });
   ```

### Issue 5: Health Check Fails

**Symptoms:**
- Railway shows deployment as failed
- Health check endpoint not responding

**Solutions:**

1. **Verify health check endpoint:**
   ```javascript
   app.get('/api/health', (req, res) => {
     res.json({ 
       status: 'OK', 
       timestamp: new Date().toISOString(),
       uptime: process.uptime()
     });
   });
   ```

2. **Check Railway health check settings:**
   - Health check path: `/api/health`
   - Timeout: 300 seconds
   - Interval: 30 seconds

## 🔧 Step-by-Step Fix Process

### Step 1: Test Locally
```bash
cd server
npm install
npm start
```
- Should start without errors
- Test: `curl http://localhost:3001/api/health`

### Step 2: Check Railway Logs
1. Go to Railway dashboard
2. Click on your project
3. Go to "Deployments"
4. Click on the latest deployment
5. Check the logs for specific error messages

### Step 3: Fix Based on Logs
- **"Cannot find module"** → Check package.json dependencies
- **"Port already in use"** → Remove manual PORT setting
- **"CORS error"** → Set FRONTEND_URL environment variable
- **"Health check failed"** → Verify /api/health endpoint

### Step 4: Redeploy
1. Make necessary fixes
2. Commit and push changes to GitHub
3. Railway will automatically redeploy
4. Check the new deployment logs

## 🚀 Alternative: Use Heroku Instead

If Railway continues to have issues, try Heroku:

### Heroku Deployment Steps:

1. **Install Heroku CLI:**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku app:**
   ```bash
   cd server
   heroku create your-chatroom-backend
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```

## 📞 Getting Help

### Railway Support:
- Check Railway documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway GitHub: https://github.com/railwayapp

### Common Error Messages:

**"Build failed"**
- Check package.json for syntax errors
- Verify all dependencies are correct
- Clear build cache and redeploy

**"Application crashed"**
- Check server logs for specific error
- Verify all required environment variables are set
- Test server locally first

**"Health check failed"**
- Verify /api/health endpoint works
- Check server is listening on correct port
- Increase health check timeout

## ✅ Quick Fix Checklist

- [ ] Test server locally with `npm start`
- [ ] Check Railway deployment logs
- [ ] Verify package.json has all dependencies
- [ ] Set FRONTEND_URL environment variable
- [ ] Clear Railway build cache
- [ ] Redeploy after fixes
- [ ] Test health check endpoint
- [ ] Verify CORS configuration

---

**Most Railway issues are resolved by checking the deployment logs and fixing the specific error shown there.**
