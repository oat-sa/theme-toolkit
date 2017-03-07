{{#if blocks.length}}
<div class="item-editor-item-related sidebar-right-section-box" id="item-editor-custom-css-blocks">
    <section class="tool-group clearfix" id="sidebar-right-item-properties">
        <h2>{{__ "Custom Styles"}}</h2>
        <div class="panel">
            <div class="panel">
                {{#each blocks}}
                <label>
                    <input name="{{className}}" type="checkbox">
                    <span class="icon-checkbox"></span>
                    {{label}}
                </label>
                {{/each}}
            </div>
        </div>
    </section>
</div>
{{/if}}
