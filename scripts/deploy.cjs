const Client = require('ssh2-sftp-client');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

async function deploy() {
  const sftp = new Client();
  const config = {
    host: process.env.IONOS_HOST,
    port: process.env.IONOS_PORT || 22,
    username: process.env.IONOS_USER,
    password: process.env.IONOS_PASS,
  };

  const remotePath = process.env.IONOS_PATH || '/';
  const localBuildPath = path.join(__dirname, '../dist');
  const backupFolder = path.posix.join(remotePath, '_backup_wordpress_antiguo');

  try {
    console.log('🚀 Paso 1: Compilando el proyecto (npm run build)...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('\n🔌 Paso 2: Conectando al servidor SFTP de IONOS...');
    await sftp.connect(config);
    console.log('✅ Conexión SFTP exitosa.');

    console.log('\n🔍 Paso 3: Verificando archivos existentes en el servidor...');
    const list = await sftp.list(remotePath);
    
    // Filtrar para ignorar la carpeta de backup si ya existe
    const hasWpFiles = list.some(item => 
      (item.name.includes('wp-') || item.name.includes('.php')) && 
      item.name !== '_backup_wordpress_antiguo' && 
      item.name !== '.' && 
      item.name !== '..'
    );

    if (hasWpFiles) {
      console.log('⚠️ Detectados archivos antiguos (WordPress). Moviendo a backup...');
      const backupExists = await sftp.exists(backupFolder);
      if (!backupExists) {
        await sftp.mkdir(backupFolder, true);
      }

      for (const item of list) {
        if (item.name !== '_backup_wordpress_antiguo' && item.name !== '.' && item.name !== '..') {
          const oldPath = path.posix.join(remotePath, item.name);
          const newPath = path.posix.join(backupFolder, item.name);
          try {
            await sftp.rename(oldPath, newPath);
            console.log(`   📦 Movido: ${item.name}`);
          } catch (renameErr) {
            console.warn(`   ⚠️ No se pudo mover: ${item.name} (${renameErr.message})`);
          }
        }
      }
    } else {
      console.log('✨ El directorio está limpio o ya respaldado.');
    }

    const fs = require('fs');

    async function uploadDirectoryFiles(localDir, remoteDir) {
      const items = fs.readdirSync(localDir);
      for (const item of items) {
        if (item === '.git') continue;
        const localPath = path.join(localDir, item);
        const remoteItemPath = remoteDir + '/' + item;
        const stat = fs.statSync(localPath);
        if (stat.isDirectory()) {
          const exists = await sftp.exists(remoteItemPath);
          if (!exists) {
            await sftp.mkdir(remoteItemPath, true);
          }
          await uploadDirectoryFiles(localPath, remoteItemPath);
        } else {
          console.log(`   🚀 Subiendo: ${item} (${(stat.size / 1024).toFixed(2)} KB)`);
          await sftp.put(localPath, remoteItemPath);
        }
      }
    }

    console.log('\n⬆️ Paso 4: Subiendo nueva versión (React) desde /dist...');
    await uploadDirectoryFiles(localBuildPath, remotePath);
    
    console.log('\n🎉 ¡DESPLIEGUE COMPLETADO CON ÉXITO! 🎉');
  } catch (err) {
    console.error('\n❌ ERROR DURANTE EL DESPLIEGUE:');
    console.error(err.message);
  } finally {
    sftp.end();
  }
}

deploy();
