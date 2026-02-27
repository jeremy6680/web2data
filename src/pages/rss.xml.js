import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import { useTranslations } from '@/i18n';

const t = useTranslations();

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title: t('siteMetadata.title'),
        description: t('siteMetadata.description'),
        site: context.site,
        items: posts.map(({ id, data: { title, summary, technos, date } }) => ({
            title,
            categories: technos.map((ref) => ref.id), // TODO: add technos name in the future
            pubDate: date,
            description: summary,
            link: `/blog/${id}/`,
        })),
    });
}
