// @ts-nocheck
import { injectable, inject } from 'inversify'
import { ToolGroup } from 'wax-prosemirror-core'

@injectable()
class MyAnnotationGroup extends ToolGroup {
  constructor(@inject('Strong') strong, @inject('Emphasis') emphasis) {
    super()
    this.tools = [strong, emphasis]
  }
}

export default MyAnnotationGroup
