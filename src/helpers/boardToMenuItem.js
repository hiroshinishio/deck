/*
 * @copyright Copyright (c) 2018 Michael Weimann <mail@michael-weimann.eu>
 *
 * @author Michael Weimann <mail@michael-weimann.eu>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import store from './../store/main'

function boardActions(item, board) {
	const actions = [{
		action: () => {
		},
		icon: 'icon-edit',
		text: t('deck', 'Edit board')
	}]

	if (!board.archived) {
		actions.push({
			action: function() {
				store.dispatch('archiveBoard', board)
			},
			icon: 'icon-archive',
			text: t('deck', 'Archive board')
		})
	}

	actions.push({
		action: () => {
			item.loading = true
			item.utils.actions = []
			item.menuOpened = false
		},
		icon: 'icon-delete',
		text: t('deck', 'Delete board')
	})

	actions.push({
		action: () => {
		},
		icon: 'icon-settings',
		text: t('deck', 'Board details')
	})

	return actions
}

/**
 * Maps an API board to a menu item.
 * @param board
 * @returns {{id: *, classes: Array, bullet: string, text: *, router: {name: string, params: {id: *}}, utils: {actions: *[]}}}
 */
export const boardToMenuItem = board => {

	const item = {
		id: board.id,
		key: board.id,
		classes: [],
		bullet: `#${board.color}`,
		text: board.title,
		owner: board.owner,
		router: {
			name: 'board',
			params: { id: board.id }
		},
		utils: {},
		board: board
	}

	item.utils.actions = boardActions(item, board)

	return item
}
