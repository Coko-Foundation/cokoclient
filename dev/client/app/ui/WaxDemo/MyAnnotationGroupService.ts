// @ts-nocheck
import { Service } from 'wax-prosemirror-core'
import MyAnnotationGroup from './MyAnnotationGroup'

class MyAnnotationGroupService extends Service {
  register() {
    this.container.bind('MyAnnotationGroup').to(MyAnnotationGroup)
  }
}

export default MyAnnotationGroupService
