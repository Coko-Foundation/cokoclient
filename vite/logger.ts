import pc from 'picocolors'

const logger = {
  divider: () => {
    console.log(pc.dim('—'.repeat(50)))
  },

  header: (txt: string) => {
    console.log(`\n${pc.bgCyan(pc.black(` ${txt.toUpperCase()} `))}`)
  },

  item: (label: string, val: any) => {
    const valueColor = val === 'production' ? pc.magenta : pc.yellow

    console.log(
      `${pc.cyan('●')} ${pc.bold(label.padEnd(27))} ${pc.dim('→')} ${valueColor(
        val ?? 'not set',
      )}`,
    )
  },

  newLine: () => {
    console.log('')
  },
}

export default logger
