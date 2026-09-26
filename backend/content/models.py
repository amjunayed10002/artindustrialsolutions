from django.db import models


class SiteSnapshot(models.Model):
    data = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Site data updated {self.updated_at:%Y-%m-%d %H:%M}"


class PublicSubmission(models.Model):
    kind = models.CharField(max_length=16, choices=(("rfq", "RFQ"), ("contact", "Contact")))
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)