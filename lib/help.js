const { contain, mapObj } = require('licia');

const { readTpl } = require('./util');

module.exports = async function() {
    const cmdName = options.remain[0];
    if (
        contain(
            [
                'benchmark',
                'test',
                'build',
                'update',
                'format',
                'demo',
                'lint',
                'cspell'
            ],
            cmdName
        )
    ) {
        await output(cmdName);
    } else {
        await outputAll();
    }
};

async function outputAll() {
    const tpl = await readTpl('help');

    console.log(tpl(help));
}

async function output(name) {
    const tpl = await readTpl('helpCmd');

    console.log(tpl(helpData[name]));
}

const helpData = {
    test: {
        command: 'test',
        desc: 'Generate test files.',
        usage: ['test [<module-name>] [options]', 'test lpad --browser'],
        options: [
            {
                shorthand: '-b',
                flag: '--browser',
                desc: 'True if test should run in a browser.'
            },
            {
                shorthand: '-a',
                flag: '--all',
                desc: 'Generate all tests.'
            },
            {
                flag: '--ts',
                desc: 'Generate typescript test file.'
            },
            {
                shorthand: '-r',
                flag: '--release',
                desc: 'Test generated node package.'
            },
            {
                shorthand: '-s',
                flag: '--silent',
                desc: 'Disable output log.'
            }
        ]
    },
    demo: {
        command: 'demo',
        desc: 'Generate html demo file.',
        usage: ['demo [<module-name>]']
    },
    benchmark: {
        command: 'benchmark',
        desc: 'Generate benchmark files.',
        usage: ['benchmark <module-name>']
    },
    format: {
        command: 'format',
        desc: 'Format module source code.',
        usage: ['format [<module-name>]']
    },
    lint: {
        command: 'lint',
        desc: 'Lint module source code.',
        usage: ['lint <module-name>']
    },
    spell: {
        command: 'spell',
        desc: 'Code spell checking.',
        usage: ['spell <module-name>']
    },
    update: {
        command: 'update',
        desc: 'Update module info and documentation.',
        usage: ['update']
    },
    build: {
        command: 'build',
        desc: 'Transform files into commonjs modules.',
        usage: ['build']
    }
};

const help = {
    usage: ['<command> [options]']
};

help.commands = mapObj(helpData, command => command.desc);
help.commands.help = 'Display help information.';
