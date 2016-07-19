/* Show elements. TODO
 *
 * ```javascript
 * $show('#test');
 * ```
 */

_('each $safeNodes');

function exports(nodes)
{
    nodes = $safeNodes(nodes);

    each(nodes, function (node)
    {
        if (isHidden(node))
        {
            node.style.display = getDefDisplay(node.nodeName);
        }
    });
}

function isHidden(node)
{
    return getComputedStyle(node, '').getPropertyValue('display') == 'none';
}

var elDisplay = {};

function getDefDisplay(nodeName)
{
    var el, display;

    if (!elDisplay[nodeName])
    {
        el = document.createElement(nodeName);
        document.documentElement.appendChild(el);
        display = getComputedStyle(el, '').getPropertyValue("display");
        el.parentNode.removeChild(el);
        display == "none" && (display = "block");
        elDisplay[nodeName] = display;
    }

    return elDisplay[nodeName];
}