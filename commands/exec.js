/*const { exec } = require('child_process');

exports.run = async (client, message, msg, args) => {
  if (!message.author.id === '213632190557192192') {
    return message.channel.send('You are not authorized to run this command.') 
    } else {
      const command = args.join(' ');
      const outMessage = await msg.channel.send(`Running \`${command}\`...`);
      let stdOut = await doExec(command).catch(data=> outputErr(outMessage, data));
      stdOut = stdOut.substring(0, 1750);
      outMessage.edit(`\`OUTPUT\`
    \`\`\`sh
    ${stdOut}
    \`\`\``);
    };
    const outputErr = (msg, stdData) => {
      const { stdout, stderr } = stdData;
      const message = stdout.concat(`\`\`\`${stderr}\`\`\``);
      msg.edit(message);
    };
    
    const doExec = (cmd, opts = {}) => {
      return new Promise((resolve, reject) => {
        exec(cmd, opts, (err, stdout, stderr) => {
          if (err) return reject({ stdout, stderr });
          resolve(stdout);
        });
      });
    };
}
  /* const command = args.join(' ');
  const outMessage = await msg.channel.send(`Running \`${command}\`...`);
  let stdOut = await doExec(command).catch(data=> outputErr(outMessage, data));
  stdOut = stdOut.substring(0, 1750);
  outMessage.edit(`\`OUTPUT\`
\`\`\`sh
${stdOut}
\`\`\``);
};
const outputErr = (msg, stdData) => {
  const { stdout, stderr } = stdData;
  const message = stdout.concat(`\`\`\`${stderr}\`\`\``);
  msg.edit(message);
};

const doExec = (cmd, opts = {}) => {
  return new Promise((resolve, reject) => {
    exec(cmd, opts, (err, stdout, stderr) => {
      if (err) return reject({ stdout, stderr });
      resolve(stdout);
    });
  });
}; */
