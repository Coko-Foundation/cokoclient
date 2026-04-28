/* eslint-disable no-console */

import pc from 'picocolors'

const logger = {
  divider: (): void => {
    console.log(pc.dim('—'.repeat(75)))
  },

  header: (txt: string): void => {
    console.log(`\n${pc.bgCyan(pc.black(` ${txt.toUpperCase()} `))}`)
  },

  item: (label: string, val: any): void => {
    const valueColor = val === 'production' ? pc.magenta : pc.yellow

    console.log(
      `${pc.cyan('●')} ${pc.bold(label.padEnd(27))} ${pc.dim('→')} ${valueColor(
        val ?? 'not set',
      )}`,
    )
  },

  newLine: (): void => {
    console.log('')
  },
}

export default logger
