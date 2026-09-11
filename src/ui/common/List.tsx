import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove as dndArrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { List as AntList } from 'antd'

import { grid, th, ThemeValue } from '../../toolkit'
import { without, noop } from '../../toolkit/funcs'

import UICheckBox from './Checkbox'
import Empty from './Empty'
import Search from './Search'
import UISelect from './Select'
import Pagination from './Pagination'
import VisuallyHiddenElement from './VisuallyHiddenElement'
import { Indicator } from './Spin'

type SortOption = {
  label: string
  value: string
  isDefault?: boolean
}

type PaginationConfig = {
  current?: number
  pageSize?: number
  total?: number
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  showSizeChanger?: boolean
}

type ItemSelection = {
  onChange: (selectedItems: string[]) => void
}

export type ListItem = {
  id: string
  [key: string]: unknown
}

type SelectableItemProps = {
  id: string
  index: number
  renderItem: (item: ListItem, index: number) => React.ReactNode
  onDeselect: (id: string) => void
  onSelect: (id: string) => void
  selected: boolean
  checkboxLabel?: string
}

type ListProps = Omit<
  ComponentProps<typeof AntList>,
  'dataSource' | 'renderItem' | 'pagination'
> & {
  className?: string
  dataSource: ListItem[]
  renderItem: (item: ListItem, index: number) => React.ReactNode
  footerContent?: React.ReactElement | null
  itemSelection?: ItemSelection | null
  loading?: boolean
  onSearch?: (value: string) => void
  onSortOptionChange?: ((value: string) => void) | null
  pagination?: PaginationConfig | false
  searchLoading?: boolean
  searchPlaceholder?: string
  showPagination?: boolean
  showSearch?: boolean
  showSort?: boolean
  showTotalCount?: boolean
  sortOptions?: SortOption[]
  totalCount?: number | null
  draggable?: boolean
  onDragEnd?: (event: DragEndEvent) => void
  selectedItems?: string[]
}

// #region styled
const Wrapper = styled.div`
  background-color: ${th('colorBackground')};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const DroppableWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const SearchWrapper = styled.div`
  align-self: center;
  max-width: 1170px;
  padding: 0 ${grid(2)};
  width: 100%;
`

const InternalHeader = styled.div`
  border-bottom: 1px solid ${th('colorBorder')};
  display: flex;
  padding: ${grid(2)};
`

const TotalCount = styled.div`
  align-items: center;
  display: flex;
`

const SortWrapper = styled.div`
  margin-left: auto;
`

const Select = styled(UISelect)`
  display: inline-block;
  margin-left: ${grid(2)};
  width: 150px;
`

const ListItemWrapper = styled.li<{ $isDragging?: boolean }>`
  align-items: center;
  display: flex;
  justify-content: stretch;

  > div {
    border: 2px solid
      ${({ $isDragging }): ThemeValue =>
        $isDragging ? th('colorPrimary') : 'transparent'};

    &:focus {
      border: 2px solid ${th('colorPrimary')};
    }
  }
`

const StyledList = styled(AntList<ListItem>)`
  flex-grow: 1;
  overflow: auto;

  .ant-spin-nested-loading {
    height: 100%;

    .ant-spin {
      display: grid;
      max-height: unset;
      place-content: center;
    }
  }
`

const StyledLoader = styled(Indicator)`
  transform: translateY(-100%);
`

const FooterWrapper = styled.div`
  border: 1px solid ${th('colorBorder')};
  display: flex;
  justify-content: space-between;
  padding: 5px;
`

const CheckBox = styled(UICheckBox)`
  padding: ${grid(2)};
`
// #endregion styled

const SelectableItem = (props: SelectableItemProps): React.ReactNode => {
  const {
    id,
    index,
    renderItem,
    onDeselect,
    onSelect,
    selected,
    checkboxLabel = '',
    ...rest
  } = props

  const handleChange = (): void => {
    if (selected) {
      onDeselect(id)
    } else {
      onSelect(id)
    }
  }

  return checkboxLabel !== '' ? (
    <>
      <CheckBox
        aria-label={checkboxLabel}
        checked={selected}
        onChange={handleChange}
      />
      {renderItem({ id, ...rest }, index)}
    </>
  ) : (
    <CheckBox checked={selected} onChange={handleChange}>
      <VisuallyHiddenElement>Select item: </VisuallyHiddenElement>
      {renderItem({ id, ...rest }, index)}
    </CheckBox>
  )
}

type SortableItemProps = {
  id: string
  children: React.ReactNode
}

const SortableItem = ({ id, children }: SortableItemProps): React.ReactNode => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  return (
    <ListItemWrapper
      $isDragging={isDragging}
      data-testid="list-item-wrapper"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </ListItemWrapper>
  )
}

const List = (props: ListProps): React.ReactNode => {
  const {
    footerContent = null,
    className,
    dataSource,
    locale,
    pagination,
    renderItem,
    itemSelection = null,
    loading = false,
    onSearch,
    onSortOptionChange = null,
    searchLoading = false,
    searchPlaceholder,
    showPagination = true,
    showSearch = false,
    showSort = false,
    showTotalCount = false,
    sortOptions = [],
    totalCount = null,
    draggable = false,
    onDragEnd = noop,
    selectedItems = [],
    ...rest
  } = props

  const handleSelect = (id: string): void => {
    itemSelection?.onChange?.([...selectedItems, id])
  }

  const handleDeselect = (id: string): void => {
    itemSelection?.onChange?.(without(selectedItems, id))
  }

  const listItemToRender = itemSelection
    ? (itemProps: ListItem, i: number): React.ReactNode => {
        return draggable ? (
          <SortableItem id={itemProps.id} key={itemProps.id}>
            <SelectableItem
              index={i}
              onDeselect={handleDeselect}
              onSelect={handleSelect}
              renderItem={renderItem}
              selected={selectedItems.includes(itemProps?.id)}
              {...itemProps}
            />
          </SortableItem>
        ) : (
          <ListItemWrapper data-testid="list-item-wrapper" key={itemProps?.id}>
            <SelectableItem
              index={i}
              onDeselect={handleDeselect}
              onSelect={handleSelect}
              renderItem={renderItem}
              selected={selectedItems.includes(itemProps?.id)}
              {...itemProps}
            />
          </ListItemWrapper>
        )
      }
    : (itemProps: ListItem, i: number): React.ReactNode => {
        return draggable ? (
          <SortableItem id={itemProps.id} key={itemProps.id}>
            {renderItem(itemProps, i)}
          </SortableItem>
        ) : (
          <ListItemWrapper data-testid="list-item-wrapper">
            {renderItem(itemProps, i)}
          </ListItemWrapper>
        )
      }

  const passedPagination = {
    current: 1,
    pageSize: 10,
    ...pagination,
  }

  let splitDataSource = [...dataSource]

  // `totalCount` prop exists only to display the count at the top of the list,
  // but since we have the value, might as well pass it to the pagination config.
  // If the pagination config has a `total` key, then use that.
  // if neither `total` key nor totalCount are present but pagination object still exist, use dataSource.length as total
  if (passedPagination && !passedPagination.total) {
    if (totalCount) {
      passedPagination.total = totalCount
    } else {
      passedPagination.total = splitDataSource.length
    }
  }

  if (pagination) {
    if (
      splitDataSource.length >
      (passedPagination.current - 1) * passedPagination.pageSize
    ) {
      splitDataSource = [...dataSource].splice(
        (passedPagination.current - 1) * passedPagination.pageSize,
        passedPagination.pageSize,
      )
    }
  }

  const largestPage = Math.ceil(
    (passedPagination.total ?? 0) / passedPagination.pageSize,
  )

  if (passedPagination.current > largestPage) {
    passedPagination.current = largestPage
  }

  const showInternalHeaderRow = showSort || showTotalCount
  const defaultSortOption = sortOptions && sortOptions.find(o => o.isDefault)

  // remove `isDefault` prop from sortOptions bcs it's unrecognized when spread onto an html <option>
  const sanitizedSortOptions = sortOptions.map(({ label, value }) => ({
    label,
    value,
  }))

  const mergedLocale = {
    emptyText: !loading ? (
      <span role="status">
        <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </span>
    ) : (
      <div role="status">Loading</div>
    ),
    ...locale,
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const sortableIds = splitDataSource.map(item => item.id)

  const ListToRender = draggable ? (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={sortableIds}
        strategy={verticalListSortingStrategy}
      >
        <DroppableWrapper>
          <AntList
            dataSource={splitDataSource}
            loading={
              loading
                ? { spinning: true, indicator: <StyledLoader /> }
                : { spinning: false, indicator: <StyledLoader /> }
            }
            locale={mergedLocale}
            renderItem={listItemToRender}
            {...rest}
            pagination={false}
          />
        </DroppableWrapper>
      </SortableContext>
    </DndContext>
  ) : (
    <StyledList
      dataSource={splitDataSource}
      loading={
        loading
          ? { spinning: true, indicator: <StyledLoader /> }
          : { spinning: false, indicator: <StyledLoader /> }
      }
      locale={mergedLocale}
      renderItem={listItemToRender}
      {...rest}
    />
  )

  return (
    <Wrapper className={className}>
      {showSearch && (
        <SearchWrapper>
          <Search
            aria-label="Enter text to search in list"
            loading={searchLoading}
            onSearch={onSearch}
            placeholder={searchPlaceholder}
          />
        </SearchWrapper>
      )}

      {showInternalHeaderRow && (
        <InternalHeader>
          {showTotalCount && (
            <TotalCount>
              <span>{totalCount} results</span>
            </TotalCount>
          )}

          {showSort && (
            <SortWrapper>
              {/* disabling linter for this line because the label is indeed associated with the select input */}
              {/* alternatively: add a label prop to Select and render it from within the component */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                Sort by
                <Select
                  data-testid="sort-select"
                  defaultValue={defaultSortOption && defaultSortOption.value}
                  id="sortBy"
                  onChange={
                    onSortOptionChange
                      ? (value: unknown): void =>
                          onSortOptionChange(value as string)
                      : undefined
                  }
                  options={sanitizedSortOptions}
                />
              </label>
            </SortWrapper>
          )}
        </InternalHeader>
      )}

      {ListToRender}

      {(footerContent || showPagination) && (
        <FooterWrapper>
          {footerContent || <div />}

          {showPagination && (
            <Pagination
              onChange={pagination ? pagination.onChange : undefined}
              onShowSizeChange={
                pagination ? pagination.onShowSizeChange : undefined
              }
              pagination={passedPagination}
            />
          )}
        </FooterWrapper>
      )}
    </Wrapper>
  )
}

List.Item = AntList.Item

export { dndArrayMove }
export type { DragEndEvent }
export default List
