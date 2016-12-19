/*
* Dependencias
*/
var GulpSSH = require('gulp-ssh');
var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));
var git = require('simple-git');
var fs = require('fs');
var fe = require('fs-extra');
var exec = require('child_process').exec;
var ssh_exec = require('ssh-exec');


var username = json.remoteserver.usuario_remoto;
var password = json.remoteserver.password_remoto;
var ip = json.remoteserver.ip_remoto;
var host = json.remoteserver.ruta_remoto;
var privateKey = json.localserver.privateKey_local;
//var privateKey = fs.readFileSync(json.localserver.privateKey_local);
var directorio = json.Directorio.nombre_dir;
var url_repo_git = json.repository.url;


var config = {
  host: '178.62.123.244',
  port: 22,
  username: 'root',
  privateKey: fs.readFileSync('/home/ubuntu/.ssh/id_rsa')
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
})

gulp.task('paquete-ocean', function(){
    var ocean = require("gitbook-start-digitalocean-merquililycony");
});

gulp.task('deploy', function () {
  return gulp.src('')
      .pipe(shell(['./generar-permisos']))
      .pipe(shell(['./scripts/losh generate-gitbook']))
      //.pipe(shell(['./scripts/losh deploy-gitbook']))

});

gulp.task('push', function(){

    if (!fe.existsSync(path.join(__dirname, '.git'))){
      git()
        .init()
        .add('./*')
        .commit("first commit")
        .addRemote('origin', json.repository.url)
        .push('origin', 'master');
    }
    else
    {
       git()
        .add('./*')
        .commit("Actualizando Gitbook.")
        .push('origin', 'master');
    }
});

gulp.task('deploy-digitalocean',function(){
  return gulpSSH
    .shell(['cd /home/src/sytw/', 'git clone '+url_repo_git], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'))

});

gulp.task('run-server', function () {
  return gulpSSH
    .shell(['cd /home/src/sytw/'+directorio+'/template', 'cp app.js ../app.js','cd ..', 'node app.js &'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'))
});
