// @ts-nocheck
import { DefaultSchema, ShortCutsService } from 'wax-prosemirror-core'
import {
  InlineAnnotationsService,
  TextBlockLevelService,
} from 'wax-prosemirror-services'
import MyAnnotationGroupService from './MyAnnotationGroupService'

const waxDemoConfig = {
  SchemaService: DefaultSchema,
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: ['MyAnnotationGroup'],
    },
  ],
  ShortCutsService: {},
  services: [
    new InlineAnnotationsService(),
    new TextBlockLevelService(),
    new MyAnnotationGroupService(),
  ],
}

export default waxDemoConfig
